import React from 'react';
import Loading from '../components/Loading';
import SecretSanta from './SecretSanta';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  // TODO need to load in all user sessions as a list to pick from
  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="ui segment">
            <SecretSanta />
          </div>
        )}
      </div>
    );
  }
};