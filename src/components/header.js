import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends PureComponent {

    renderLinks() {
        if (this.props.authenticated) {
            return [
                <li className="nav-item left" key="task_list">
                    <Link className="nav-link" to="/">Task list</Link>
                </li>,
                <li className="nav-item left" key="log_out">
                    <Link className="nav-link" to="/signout">Log Out</Link>
                </li>
            ];
        } else {
            return [
                <li className="nav-item left" key="task_list">
                    <Link className="nav-link" to="/">Task list</Link>
                </li>,
                <li className="nav-item" key="login">
                    <Link className="nav-link" to="/signin">Login</Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <Link to="/" className="navbar-brand">Beejee</Link>
                <ul className="navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps)(Header);
