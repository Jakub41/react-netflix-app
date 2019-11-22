import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Main from './Pages/main/Main'
import DetailMovie from './Pages/movie/Detail'

//style
import './App.css'
import './styles/ui.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:imdbID" component={DetailMovie} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
