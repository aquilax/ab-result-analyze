import Backbone from 'backbone';
import $ from 'jquery/dist/jquery.slim';
import _ from 'underscore';
import abResult from 'ab-result';

class AbResultModel extends Backbone.Model {}

class AbResultCollection extends Backbone.Collection.extend({
    model: AbResultModel,
}) {}

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
        data.cid = this.model.cid;
        this.collection.add([new AbResultModel(data)]);
    }

    onClickExport() {
        this.$el.find('#export-data').html(JSON.stringify(this.collection.toJSON()));
    }

    onClickCompare() {
        window.alert('Not Implemented');
    }

    onClickImport() {
        const data = window.prompt('Paste exported data', '[]');
        const collectionData = JSON.parse(data);
        this.collection.reset(collectionData);
    }
}

$(window.document).ready(() => {
    const appView = new AppView();
});
