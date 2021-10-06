import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

import Home from '../Pages/Home';

import SignUp from './auth/SignUp';
import Login from './auth/Login';
import PrivateRoute from "./auth/PrivateRoute";

function App() {
    return (
        <div className="app">
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute path="/room/:chatroom" component={Home} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
