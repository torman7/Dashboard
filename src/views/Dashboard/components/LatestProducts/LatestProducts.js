import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=48ab4b211f3c108306abd71a984bd231';
const PATH_ZIP = '&zip=25703';

const url = `${PATH_BASE}${PATH_ZIP}`;

class App extends Component {

  constructor(props)
  {
    super(props);

    // state variables
    this.state = {
      results: null,
    }

    //this.setWeather = this.setWeather.bind(this);
  }

  setWeather(results)
  {
    this.setState({results});
  }

  componentDidMount() {
    // set up searchTerm = to whatever is in the searchTerm state variable
    //const {searchTerm} = this.state;

    // fetch information from the parameter in the (), checks to see if it is JSON
    // if so, the data that comes back is in result, pass that to our setSearchTopStories
    // function where it sets up our state variable for result
    // if there is an error, save it in error
    fetch(`${url}`)
      .then(response => response.json())
      .then(result => this.setWeather(result))
      .catch(error => error);
  }
  render()
  {
    const { results } = this.state;

    return (
      <Card>
        <CardHeader
          title="Local Weather"
        />
        <Divider />
        <CardContent>
          { results ?
          <Typography>
            <h1>
              {results.name}
            </h1>
            <h2>
              {results.main.temp} <sup>o</sup>F
            </h2>
            <h3>
              {results.weather[0].main}
            </h3>
          </Typography>
          : null
          }
        </CardContent>
      </Card>
    );
  }
};

App.propTypes = {
  className: PropTypes.string
};

export default App;