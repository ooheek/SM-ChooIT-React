import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Detail from './pages/detail'
import Review from './pages/review'
import ReviewWrite from './pages/review-write'
import Sign from './pages/sign'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/detail/:id">
          <Detail />
        </Route>
        <Route exact path="/detail/:id/review/write">
          <ReviewWrite />
        </Route>
        <Route exact path="/detail/:id/review/:reviewId">
          <Review />
        </Route>
        <Route exact path="/sign/email=:email">
          <Sign />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
