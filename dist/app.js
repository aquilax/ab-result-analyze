webpackJsonp([0],{

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backbone = __webpack_require__(70);

var _backbone2 = _interopRequireDefault(_backbone);

var _jquery = __webpack_require__(23);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(40);

var _underscore2 = _interopRequireDefault(_underscore);

var _chart = __webpack_require__(71);

var _chart2 = _interopRequireDefault(_chart);

var _abResult = __webpack_require__(192);

var _abResult2 = _interopRequireDefault(_abResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbResultModel = function (_Backbone$Model) {
    _inherits(AbResultModel, _Backbone$Model);

    function AbResultModel() {
        _classCallCheck(this, AbResultModel);

        return _possibleConstructorReturn(this, (AbResultModel.__proto__ || Object.getPrototypeOf(AbResultModel)).apply(this, arguments));
    }

    return AbResultModel;
}(_backbone2.default.Model);

var AbResultCollection = function (_Backbone$Collection$) {
    _inherits(AbResultCollection, _Backbone$Collection$);

    function AbResultCollection() {
        _classCallCheck(this, AbResultCollection);

        return _possibleConstructorReturn(this, (AbResultCollection.__proto__ || Object.getPrototypeOf(AbResultCollection)).apply(this, arguments));
    }

    return AbResultCollection;
}(_backbone2.default.Collection.extend({
    model: AbResultModel
}));

var DiffView = function (_Backbone$View$extend) {
    _inherits(DiffView, _Backbone$View$extend);

    function DiffView() {
        _classCallCheck(this, DiffView);

        return _possibleConstructorReturn(this, (DiffView.__proto__ || Object.getPrototypeOf(DiffView)).apply(this, arguments));
    }

    _createClass(DiffView, [{
        key: 'initialize',
        value: function initialize(options) {
            this.render(options.model1, options.model2);
        }
    }, {
        key: 'render',
        value: function render(model1, model2) {
            this.$el.html(this.template({
                model1: model1.toJSON(),
                model2: model2.toJSON()
            }));
            return this;
        }
    }]);

    return DiffView;
}(_backbone2.default.View.extend({
    template: _underscore2.default.template((0, _jquery2.default)('#diff-template').html())
}));

var PreviewView = function (_Backbone$View$extend2) {
    _inherits(PreviewView, _Backbone$View$extend2);

    function PreviewView() {
        _classCallCheck(this, PreviewView);

        return _possibleConstructorReturn(this, (PreviewView.__proto__ || Object.getPrototypeOf(PreviewView)).apply(this, arguments));
    }

    _createClass(PreviewView, [{
        key: 'initialize',
        value: function initialize() {
            this.listenTo(this.model, 'change', this.render);
        }
    }, {
        key: 'render',
        value: function render() {
            this.$el.html(this.template({
                model: this.model.toJSON()
            }));
            return this;
        }
    }]);

    return PreviewView;
}(_backbone2.default.View.extend({
    template: _underscore2.default.template((0, _jquery2.default)('#preview-template').html())
}));

var ResultListView = function (_Backbone$View$extend3) {
    _inherits(ResultListView, _Backbone$View$extend3);

    function ResultListView() {
        _classCallCheck(this, ResultListView);

        return _possibleConstructorReturn(this, (ResultListView.__proto__ || Object.getPrototypeOf(ResultListView)).apply(this, arguments));
    }

    _createClass(ResultListView, [{
        key: 'initialize',
        value: function initialize() {
            this.listenTo(this.collection, 'update reset', this.render);
        }
    }, {
        key: 'render',
        value: function render() {
            this.$el.html(this.template({
                collection: this.collection.toJSON()
            }));
            return this;
        }
    }, {
        key: 'onClickView',
        value: function onClickView(event) {
            window.alert('Not implemented');
        }
    }, {
        key: 'onClickRemove',
        value: function onClickRemove(event) {
            window.alert('Not implemented');
        }
    }]);

    return ResultListView;
}(_backbone2.default.View.extend({
    template: _underscore2.default.template((0, _jquery2.default)('#result-list-template').html()),
    events: {
        'click .view': 'onClickView',
        'click .remove': 'onClickRemove'
    }
}));

var ChartView = function (_Backbone$View$extend4) {
    _inherits(ChartView, _Backbone$View$extend4);

    function ChartView() {
        _classCallCheck(this, ChartView);

        return _possibleConstructorReturn(this, (ChartView.__proto__ || Object.getPrototypeOf(ChartView)).apply(this, arguments));
    }

    _createClass(ChartView, [{
        key: 'initialize',
        value: function initialize(op) {
            this.op = op;
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            this.$el.html(this.template());
            var ctx = this.$el.find('.chart').get(0).getContext('2d');
            this.chart = new _chart2.default(ctx, {
                type: this.op.type,
                data: this.op.data,
                options: this.op.options
            });
            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.chart.destroy();
            this.remove();
        }
    }]);

    return ChartView;
}(_backbone2.default.View.extend({
    template: _underscore2.default.template((0, _jquery2.default)('#chart-template').html())
}));

var AppView = function (_Backbone$View$extend5) {
    _inherits(AppView, _Backbone$View$extend5);

    function AppView() {
        _classCallCheck(this, AppView);

        return _possibleConstructorReturn(this, (AppView.__proto__ || Object.getPrototypeOf(AppView)).apply(this, arguments));
    }

    _createClass(AppView, [{
        key: 'initialize',
        value: function initialize() {
            this.model = new AbResultModel();
            this.collection = new AbResultCollection();
            this.diffView = null;
            this.chartViews = [];
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            this.$el.html(this.template());
            this.$el.find('#ab-preview').html(new PreviewView({
                model: this.model
            }).el);
            // Reset model with empty data
            this.model.set((0, _abResult2.default)(''));

            this.$el.find('#ab-results').html(new ResultListView({
                collection: this.collection
            }).el);

            return this;
        }
    }, {
        key: 'onClickProcess',
        value: function onClickProcess() {
            var text = this.$el.find('.content').val();
            this.model.set((0, _abResult2.default)(text));
        }
    }, {
        key: 'onClickAdd',
        value: function onClickAdd() {
            var data = this.model.toJSON();
            var newModel = new AbResultModel(data);
            newModel.set('cid', newModel.cid);
            this.collection.add([newModel]);
        }
    }, {
        key: 'onClickExport',
        value: function onClickExport() {
            this.$el.find('#export-data').html('<textarea cols="80" rows="10">' + JSON.stringify(this.collection.toJSON()) + '</textarea>');
        }
    }, {
        key: 'onClickCompare',
        value: function onClickCompare() {
            var fromCid = this.$el.find('input[name=\'from\']:checked').val();
            var toCid = this.$el.find('input[name=\'to\']:checked').val();
            if (!(fromCid && toCid)) {
                window.alert('Please select results to compare');
                return;
            }
            var fromModel = this.collection.findWhere({
                cid: fromCid
            });
            var toModel = this.collection.findWhere({
                cid: toCid
            });
            if (this.diffView) {
                this.diffView.remove();
            }
            this.diffView = new DiffView({
                model1: fromModel,
                model2: toModel
            });
            this.$el.find('#diff-results').html(this.diffView.el);
        }
    }, {
        key: 'onClickImport',
        value: function onClickImport() {
            var data = window.prompt('Paste exported data', '[]');
            var collectionData = JSON.parse(data);
            this.collection.reset(collectionData);
        }
    }, {
        key: 'onClickCharts',
        value: function onClickCharts() {
            var _this8 = this;

            var parent = this.$el.find('#chart-results');
            this.chartViews.forEach(function (view) {
                view.destroy();
            });

            var keys = {
                completeRequests: {
                    color: '#5cbae6'
                },
                concurencyLevel: {
                    color: '#b6d957'
                },
                failedRequests: {
                    color: '#fac364'
                },
                htmlTransferred: {
                    color: '#8cd3ff'
                },
                requestsPerSecond: {
                    color: '#d998cb'
                },
                timePerRequest: {
                    color: '#f2d249'
                },
                timePerRequestAll: {
                    color: '#93b9c6'
                },
                timeTaken: {
                    color: '#ccc5a8'
                },
                totalTransferred: {
                    color: '#52bacc'
                },
                transferRate: {
                    color: '#dbdb46'
                }
            };
            var tests = this.collection.pluck('test');
            var lbls = tests.map(function (el) {
                return 'n:' + el.completeRequests + '/c:' + el.concurencyLevel;
            });

            Object.keys(keys).forEach(function (key) {
                var dataSeries = _underscore2.default.pluck(tests, key);
                var view = new ChartView({
                    type: 'line',
                    data: {
                        labels: lbls,
                        datasets: [{
                            backgroundColor: keys[key]['color'],
                            label: key,
                            data: dataSeries
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                _this8.chartViews.push(view);
                parent.append(view.el);
            });
        }
    }]);

    return AppView;
}(_backbone2.default.View.extend({
    el: '#app',
    template: _underscore2.default.template((0, _jquery2.default)('#app-template').html()),
    events: {
        'click .process': 'onClickProcess',
        'click #add': 'onClickAdd',
        'input textarea': 'onClickProcess',
        'click #export': 'onClickExport',
        'click #compare': 'onClickCompare',
        'click #import': 'onClickImport',
        'click #charts': 'onClickCharts'
    }
}));

(0, _jquery2.default)(window.document).ready(function () {
    var appView = new AppView();
    window.vdiff = function (v1, v2, extra, first) {
        var extraText = extra === undefined ? '' : extra;
        var color = 'eq';
        if (v1 > v2) {
            color = 'sm';
        }
        if (v1 < v2) {
            color = 'gr';
        }
        return '<td class="' + color + '">' + v1 + ' ' + extraText + '</td>';
    };
});

/***/ })

},[282]);
//# sourceMappingURL=app.js.map