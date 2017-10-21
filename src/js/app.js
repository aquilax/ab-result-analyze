import Backbone from 'backbone';
import $ from 'jquery/dist/jquery.min';
import _ from 'underscore';
import abResult from 'ab-result';

class AbResultView extends Backbone.View.extend({
    //template: _.template($('#ab-result').html()),

}) {
    initialize() {
        this.render();
    }

    render() {
        this.$el.html(this.template());
    }
}

class AbResultModel extends Backbone.Model {}

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

class AppView extends Backbone.View.extend({
    el: '#app',
    template: _.template($('#app-template').html()),
    events: {
        'click .process': 'onClickProcess',
    },
}) {
    initialize() {
        this.model = new AbResultModel();
        this.render();
    }

    render() {
        this.$el.html(this.template());
        this.$el.find('#ab-preview').html(new PreviewView({
            model: this.model,
        }).el);
        // Reset model with empty data
        this.model.set(abResult(''));
        return this;
    }

    onClickProcess() {
        const text = this.$el.find('.content').val();
        const result = abResult(text)
        this.model.set(abResult(text))
    }
}

$(window.document).ready(() => {
    const appView = new AppView();
});
