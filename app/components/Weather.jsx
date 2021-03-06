var React = require("react");
var WeatherForm = require("WeatherForm");
var WeatherMessage = require("WeatherMessage");
var openWeatherMap = require("openWeatherMap");
var ErrorModal = require("ErrorModal");

var Weather = React.createClass({
    getInitialState: function() {
        return {
            isLoading: false
        }
    },
    handleSearch: function(location) {
        var that = this;

        this.setState({
            isLoading: true,
            errorMessage: undefined,
            location: undefined,
            temp: undefined
        });

        openWeatherMap.getTemp(location).then(function(temp) {
            that.setState({
                location: location,
                temp: temp,
                isLoading: false
            });
        }, function(e) {
            that.setState({
                isLoading: false,
                errorMessage: e.message
            });
            // alert(that.state.errorMessage);
            
        });
        

        

        // this.setState({
        //     location: location,
        //     temp: 23
        // })
    },
    componentDidMount: function() {
        // query string
        // props.location here is not the city location, rather a property assigned by the Link element of react-router
        var location = this.props.location.query.location;
        console.log("Props", this.props);

        if(location && location.length > 0) {
            this.handleSearch(location);
            // remove location string in url address
            window.location.hash = "#/";
        }
    },
    // will detect if component receives any props
    // reminder: parent can pass on a prop to a child
    // i.e. <Nav message={value} />
    // reminder componentWillReceivProps will be deprecated in React 17
    // please see
    // https://reactjs.org/docs/react-component.html
    componentWillReceiveProps: function(newProps) {
        // query string
        // props.location here is not the city location, rather a property assigned by the Link element of react-router
        var location = newProps.location.query.location;
        console.log("newProps", newProps);

        if(location && location.length > 0) {
            this.handleSearch(location);
            // remove location string in url address
            window.location.hash = "#/";
        }

    },
    render: function() {

        var {location, temp, isLoading, errorMessage} = this.state;
        // console.log("State before", this.state);

        function renderMessage() {
            
            if(isLoading) {
                // check if it is loading first, takes precedence even
                // if there is temp and location already in state
                return <h3 className="text-center">Fetching weather...</h3>;
            } else if(temp && location) {
                console.log("inside renderMessage", location);
                return <WeatherMessage location={location} temp={temp}/>
            }
        }

        function renderError() {
            if(typeof errorMessage === "string") {
                return (
                    <ErrorModal message={errorMessage}/>
                )
            }
        }
        return (
            <div>
                <h1 className="text-center page-title">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
                {renderError()}
            </div>
        )
  
    }
})

module.exports = Weather;