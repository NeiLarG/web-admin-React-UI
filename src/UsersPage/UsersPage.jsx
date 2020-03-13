import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class UsersPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    blockUnblockUser = (event, info) => {
        console.log(info);
        if (info.currentStatus === 'ACTIVE') {
        } else if (info.currentStatus === 'BLOCKED') {
        }
    };

    removeUser = (event, id) => {
        console.log(id);
    };

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <h4>Hello, {user.user.email}!</h4>
                <Link to="/login">Logout</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">email</th>
                            <th scope="col">status</th>
                            <th scope="col">last login date</th>
                            <th scope="col">register date</th>
                            <th scope="col">actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items ?
                            users.items.map((user) =>
                            (<tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>
                                <td>{user.lastLoginDate}</td>
                                <td>{user.registrationDate}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        value={user.id}
                                        onClick={((e) => this.blockUnblockUser(e, { id: user.id, currentStatus: user.status }))}>Block/Unblock</button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        value={user.id}
                                        onClick={((e) => this.removeUser(e, user.id))}>Remove</button>
                                </td>
                            </tr>)
                            )
                        : null}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };
