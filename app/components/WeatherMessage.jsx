var React = require("react");

// var WeatherMessage = React.createClass({
//     render: function() {
//         var {location, temp} = this.props
//         return (
//             <div>
//                 <p>It's {temp} in {location}</p>
//             </div>
//         );
//     }
// });

// es6 destructuring
var WeatherMessage = ({temp, location}) => {
    // var {location, temp} = props
    return (
        <div>
            <h3 className="text-center">It's {temp} in {location}</h3>
        </div>
    );

}

module.exports = WeatherMessage;