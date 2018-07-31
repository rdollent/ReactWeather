var React = require("react");

// needed to resolve Modal error where cant query a new city
// after querying nonexistent city or gibberish
var ReactDOM = require("react-dom");
var ReactDOMServer = require("react-dom/server");

var ErrorModal = React.createClass({
    getDefaultProps: function() {
        return {
            title: "Error"
        };
    },
    propTypes: {
        title: React.PropTypes.string,
        message: React.PropTypes.string.isRequred
    },
    componentDidMount: function() {
        var {title, message} = this.props;

        var modalMarkup = (
            <div id="error-modal" className="reveal tiny text-center" data-reveal="">
                <h4>{title}</h4>
                <p>{message}</p>
                <p>
                    <button className="button hollow" data-close="">
                        Okay
                    </button>
                </p>
            </div>
        );
        
        // jquery selector
        // when you pass in HTML elements into jquery,
        // it doesnt select them, it tries to create a
        // separate DOM which you can insert anywhere into the file
        // why are we doing this?
        // Foundation changes the DOM so when
        // modal pops up, React tries to re-load since the DOM changed

        // take JSX code and return string version
        // wil let you use string version in methods like
        // .html() or innerHTML();
        var $modal = $(ReactDOMServer.renderToString(modalMarkup));

        // find the node where 'this' lives
        // use findDOMNODE
        // takes an argument i.e. this and returns where the node is
        // findDOMNode finds the location of the node 
        // jquery selector $ selects the node using its location as its selector
        // in the DOM. then replace that node's content using .html()
        $(ReactDOM.findDOMNode(this)).html($modal);
        // added this to automatically open modal once it is rendered to the DOM
        var modal = new Foundation.Reveal($("#error-modal"));
        modal.open();
    },
    render: function() {
        
        return (
            <div>
                
            </div>
        )

        
    }
});

module.exports = ErrorModal;