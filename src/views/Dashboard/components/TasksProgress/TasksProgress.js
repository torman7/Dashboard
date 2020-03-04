import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const PATH_BASE = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&interval=5min&apikey=BCZCINIU9L5XYA3K';
const PATH_SYM = '&symbol=MSFT';

const url = `${PATH_BASE}${PATH_SYM}`;

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

  render(){
    const { results } = this.state;

    return (
      <Card>
        <CardContent>
          <Grid>
            <Grid item>
              <Typography
                
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Stocks - MICROSOFT
              </Typography>
              
              { results ?
                <Typography>
                  <h2>
                    {results["Global Quote"]["01. symbol"]}
                  </h2>
                  <h3>
                    ${results["Global Quote"]["05. price"]}
                  </h3>
                </Typography>
                : null
              }
            
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
};

App.propTypes = {
  className: PropTypes.string
};

export default App;
