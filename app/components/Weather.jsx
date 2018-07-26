var React = require("react");
var WeatherForm = require("WeatherForm");
var WeatherMessage = require("WeatherMessage");
var openWeatherMap = require("openWeatherMap");

var Weather = React.createClass({
    getInitialState: function() {
        return {
            isLoading: false
        }
    },
    handleSearch: function(location) {
        var that = this;

        this.setState({isLoading: true});

        openWeatherMap.getTemp(location).then(function(temp) {
            that.setState({
                location: location,
                temp: temp,
                isLoading: false
            });
        }, function(errorMessage) {
            that.setState({isLoading: false});
            alert(errorMessage);
            
        });
        

        

        // this.setState({
        //     location: location,
        //     temp: 23
        // })
    },
    render: function() {

        var {location, temp, isLoading} = this.state;

        function renderMessage() {
            if(isLoading) {
                // check if it is loading first, takes precedence even
                // if there is temp and location already in state
                return <h3>Fetching weather...</h3>;
            } else if(temp && location) {
                return <WeatherMessage location={location} temp={temp}/>
            }
        }
        return (
            <div>
                <h3>Weather Component</h3>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
            </div>
        )
    }
})

module.exports = Weather;