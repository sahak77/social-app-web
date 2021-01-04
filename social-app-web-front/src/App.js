import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import SignIn from './components/auth/signin/SignIn';
import SignUp from './components/auth/signup/SignUp';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Guest from './components/guest/Guest';
import Particles from 'react-particles-js';
import Home from './components/home/Home';

class App extends Component {
  state = {
    cardsData: [],
    error: false,
    firstTimeProfile: false,
    signUpSuccess: false,
    deleteAcc: false,
  }
  
  setProfile = () => {
    this.setState({
      firstTimeProfile: true
    })
  }
  setSignUpSuccess = (value) =>{
    this.setState({
      signUpSuccess: value
    })
  }
  setDeleteAcc = (value) =>{
    this.setState({
      deleteAcc: value
    })
  }
  fetchData = async () => {
    try {
      const fetchedData = await fetch('https://ancient-hollows-53837.herokuapp.com/posts')
      const data = await fetchedData.json()
      this.setState(
        { cardsData: data }
      )
    } catch (error) {
      this.setState({ error: true })
    }
  }
  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="app d-flex justify-content-center">
        <Particles
        width={"100%"}
        height={"100%"}
        style={{position: "fixed", left: 0, top:0}}
        params={{
          "particles": {
              "number": {
                  "value": 80
              },
              "size": {
                  "value": 5
              }
          },
          "interactivity": {
              "events": {
                  "onhover": {
                      "enable": true,
                      "mode": "repulse"
                  }
              }
          }
      }} 
      />
        {localStorage.token ?
        <Switch>
          <Route path='/profile' render={() => <Profile setDeleteAcc={this.setDeleteAcc} />} />
          <Route path='/newsfeed' render={() =>
            <Posts
              data={this.state.cardsData}
              error={this.state.error}
              fetchData={this.fetchData}
            />} />
          <Route path='/guest/:id' component={Guest} />
          <Redirect to="/profile" />
        </Switch>
          : 
          <Switch>
            <Route path='/' exact render={() => <Home deleteAcc={this.state.deleteAcc} setDeleteAcc={this.setDeleteAcc} />}/>
            <Route path='/signin' render={() => <SignIn setProfile={this.setProfile} signUpSuccess={this.state.signUpSuccess} setSignUpSuccess={this.setSignUpSuccess} />} />
            <Route path='/signup' render={() => <SignUp setSignUpSuccess={this.setSignUpSuccess} />} />
            <Redirect to="/" />
          </Switch>
        }
      </div>
    );
  }
}

export default App;

