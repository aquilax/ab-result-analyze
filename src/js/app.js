import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import abResult from 'ab-result';

class AbResultModel extends Backbone.Model {}

class AbResultCollection extends Backbone.Collection.extend({
    model: AbResultModel,
}) {}

class DiffView extends Backbone.View.extend({
    template: _.template($('#diff-template').html()),
}) {
    initialize(options) {
        this.render(options.model1, options.model2);
    }

    render(model1, model2) {
        this.$el.html(this.template({
            model1: model1.toJSON(),
            model2: model2.toJSON(),
        }));
        return this;
    }
}

class PreviewView extends Backbone.View.extend({
    template: _.template($('#preview-template').html()),
}) {
    initialize() {
        this.listenTo(this.model, 'change', this.render);
    }

    render() {
        this.$el.html(this.template({
            model: this.model.toJSON(),
        }));
        return this;
    }
}

class ResultListView extends Backbone.View.extend({
    template: _.template($('#result-list-template').html()),
    events: {
        'click .view': 'onClickView',
        'click .remove': 'onClickRemove',
    },
}) {
    initialize() {
        this.listenTo(this.collection, 'update reset', this.render);
    }

    render() {
        this.$el.html(this.template({
            collection: this.collection.toJSON(),
        }));
        return this;
    }

    onClickView(event) {
        window.alert('Not implemented');
    }

    onClickRemove(event) {
        window.alert('Not implemented');
    }
}

class AppView extends Backbone.View.extend({
    el: '#app',
    template: _.template($('#app-template').html()),
    events: {
        'click .process': 'onClickProcess',
        'click #add': 'onClickAdd',
        'input textarea': 'onClickProcess',
        'click #export': 'onClickExport',
        'click #compare': 'onClickCompare',
        'click #import': 'onClickImport',
    },
}) {
    initialize() {
        this.model = new AbResultModel();
        this.collection = new AbResultCollection();
        this.diffView = null;
        this.render();
    }

    render() {
        this.$el.html(this.template());
        this.$el.find('#ab-preview').html(new PreviewView({
            model: this.model,
        }).el);
        // Reset model with empty data
        this.model.set(abResult(''));

        this.$el.find('#ab-results').html(new ResultListView({
            collection: this.collection,
        }).el);

        return this;
    }

    onClickProcess() {
        const text = this.$el.find('.content').val();
        this.model.set(abResult(text));
    }

    onClickAdd() {
        const data = this.model.toJSON();
        const newModel = new AbResultModel(data);
        newModel.set('cid', newModel.cid);
        this.collection.add([newModel]);
    }

    onClickExport() {
        this.$el.find('#export-data').html('<textarea cols="80" rows="10">' + JSON.stringify(this.collection.toJSON()) + '</textarea>');
    }

    onClickCompare() {
        const fromCid = this.$el.find('input[name=\'from\']:checked').val();
        const toCid = this.$el.find('input[name=\'to\']:checked').val();
        if (!(fromCid && toCid)) {
            window.alert('Please select results to compare');
        }
        const fromModel = this.collection.findWhere({
            cid: fromCid,
        });
        const toModel = this.collection.findWhere({
            cid: toCid,
        });
        if (this.diffView) {
            this.diffView.remove();
        }
        this.diffView = new DiffView({
            model1: fromModel,
            model2: toModel,
        });
        this.$el.find('#diff-results').html(this.diffView.el);
    }

    onClickImport() {
        const data = window.prompt('Paste exported data', '[]');
        const collectionData = JSON.parse(data);
        this.collection.reset(collectionData);
    }
}

$(window.document).ready(() => {
    const appView = new AppView();
    window.vdiff = (v1, v2, extra, first) => {
        const extraText = extra === undefined ? '' : extra;
        let color = 'eq';
        if (v1 > v2) {
            color = 'sm';
        }
        if (v1 < v2) {
            color = 'gr';
        }
        return `<td class="${color}">${v1} ${extraText}</td>`;
    };
});
