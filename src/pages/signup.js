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

const styles= {
    form: {
        textAlign: 'center',
        padding: 20
    },
    signup: {
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

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            handle: '',
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const signupAttempt = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        axios.post('/signup', signupAttempt)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
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
                    <Typography variant="h2" className={classes.signup}>Sign Up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="handle" name="handle" label="Username" className={classes.textField} helperText={errors.handle} error={errors.handle ? true : false} value={this.state.handle} onChange={this.handleChange} fullWidth/>
                        <TextField id="email" name="email" label="Email" className={classes.textField} helperText={errors.email} error={errors.email ? true : false} value={this.state.email} onChange={this.handleChange} fullWidth/>
                        <TextField id="password" name="password" label="Password" className={classes.textField} helperText={errors.password} error={errors.password ? true : false} value={this.state.password} onChange={this.handleChange} fullWidth/>
                        <TextField id="confirmPassword" name="confirmPassword" label="Confirm password" className={classes.textField} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} value={this.state.confirmPassword} onChange={this.handleChange} fullWidth/>

                        {errors.general && (
                            <Typography variant="body2" className={classes.someError}>{errors.general}</Typography>
                        )}
                        <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                            SignUp 
                            {loading && (
                            <CircularProgress className={classes.progress} size={30}/>
                            )}
                        </Button>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

export default withStyles(styles)(Signup);