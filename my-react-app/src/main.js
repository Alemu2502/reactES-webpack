import React, { Component } from 'react';

// Utility function for form validation
const validateForm = (data) => {
    const errors = {};
    if (!data.name) errors.name = 'Name is required';
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }
    return errors;
};

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            errors: {},
            success: false,
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, errors: { ...this.state.errors, [name]: null } });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, email } = this.state;

        // Validate form data
        const errors = validateForm({ name, email });
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        // Simulate an API call
        this.simulateApiCall({ name, email })
            .then(() => {
                this.setState({ success: true, name: '', email: '' });
            })
            .catch((error) => {
                console.error('Submission error:', error);
                // Optionally set error state
            });
    };

    // Simulated API call for demonstration purposes
    simulateApiCall = (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate a success response
                if (data.email === 'error@example.com') {
                    reject(new Error('Simulated submission error.'));
                } else {
                    resolve();
                }
            }, 1000);
        });
    };

    render() {
        const { name, email, errors, success } = this.state;

        return (
            <div>
                <h2>User Form</h2>
                {success && <p style={{ color: 'green' }}>Form submitted successfully!</p>}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                    </div>
                    <div>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default UserForm;
