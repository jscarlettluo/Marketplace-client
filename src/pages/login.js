import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Icon from '../images/icon.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI stuff
import Grid from '@material-ui/core/grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { relative } from 'path';

const styles= {
    form: {
        textAlign: 'center',
        padding: 20
    },
    login: {
        padding: 20,
    },
    textFeild: {
        margin: '10px auto 10px auto'
    },
    button: {
        margin: '20px auto 20px auto',
        position: 'relative'
    },
    someError: {
        padding: '5px',
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    }
}


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const loginAttempt = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/login', loginAttempt)
            .then(res => {
                console.log(res)
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }
    
    handleChange  = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    render() {
        const { classes } = this.props;
        const { loading, errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={Icon} height={90} width={90} alt="marketplace"/>
                    <Typography variant="h2" className={classes.login}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" label="Email" className={classes.textField} helperText={errors.email} error={errors.email ? true : false} value={this.state.email} onChange={this.handleChange} fullWidth/>
                        <TextField id="password" name="password" label="Password" className={classes.textField} helperText={errors.password} error={errors.password ? true : false} value={this.state.password} onChange={this.handleChange} fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.someError}>{errors.general}</Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Login
                            {loading && (
                            <CircularProgress className={classes.progress} size={30} color="light"/>
                            )}
                        </Button>
                    </form>
                    <small>Don't have an account? Signup <Link to="/signup">Here!</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

export default withStyles(styles)(Login);