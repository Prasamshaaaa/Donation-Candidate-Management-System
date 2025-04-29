import { connect } from "react-redux";
import { 
    Grid, 
    TextField, 
    withStyles, 
    InputLabel, 
    Select, 
    MenuItem, 
    FormControl,
    Button,
    FormHelperText
} from "@material-ui/core";
import React, { useEffect } from "react";
import useForm from "./useForm";
import * as actions from "../actions/dCandidate";
import {useToasts} from "react-toast-notifications"

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
        '& .MuiFormControl-root': {
            margin: theme.spacing(1, 0),
            width: '100%',
        },
    },
    formControl: {
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    select: {
        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
});

const menuProps = {
    PaperProps: {
        style: {
            maxHeight: 250,
            width: 250,
        },
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left",
    },
};

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
};

const DCandidateForm = (props) => {
    const {addToast} = useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName?"":"This field is required."
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile 
                ? (/^[0-9]{10}$/).test(fieldValues.mobile) 
                    ? "" 
                    : "Mobile number is not valid."
                : "This field is required.";
        if('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup?"":"This field is required."
        if('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid.";
        setErrors({
            ...temp
        })
        if(fieldValues == values)
            return Object.values(temp).every(x => x === "")
    }

    const { 
        values, 
        setValues, 
        errors, 
        setErrors, 
        handleInputChange, 
        resetForm 
    } = useForm(initialFieldValues, validate, props.setCurrentId);

    const { classes, currentId, setCurrentId, fetchAllCandidates } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            addToast("Please fill all required fields correctly", {appearance: 'error'});
            return;
        }

        try {
            if (currentId === 0) {
                await props.createDCandidate(values);
                addToast("Candidate created successfully!", {appearance: 'success'});
            } else {
                await props.updateDCandidate(currentId, values);
                addToast("Candidate updated successfully!", {appearance: 'success'});
            }
            resetForm();
            fetchAllCandidates();
        } catch (error) {
            addToast("Operation failed! " + error.message, {appearance: 'error'});
        }
    };

    useEffect(() => {
        if (currentId !== 0) {
            const candidate = props.dCandidateList.find(x => x.id === currentId);
            if (candidate) {
                setValues({
                    ...candidate
                });
            }
        }
    }, [currentId, props.dCandidateList]);

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        className={classes.formControl}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        className={classes.formControl}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl variant="outlined" className={classes.formControl}
                        {...(errors.bloodGroup && { error: true})}>
                        <InputLabel id="blood-group-label">Blood Group</InputLabel>
                        <Select
                            labelId="blood-group-label"
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            label="Blood Group"
                            MenuProps={menuProps}
                            className={classes.select}
                        >
                            <MenuItem value="">
                                <em>Select Blood Group</em>
                            </MenuItem>
                            <MenuItem value="AB+">AB +ve</MenuItem>
                            <MenuItem value="AB-">AB -ve</MenuItem>
                            <MenuItem value="A+">A +ve</MenuItem>
                            <MenuItem value="A-">A -ve</MenuItem>
                            <MenuItem value="B+">B +ve</MenuItem>
                            <MenuItem value="B-">B -ve</MenuItem>
                            <MenuItem value="O+">O +ve</MenuItem>
                            <MenuItem value="O-">O -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        className={classes.formControl}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        className={classes.formControl}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        className={classes.formControl}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button 
                            size="small"
                            variant="contained"
                            className={classes.smMargin}
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button 
                            size="small"
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
};

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list 
});

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update,
    fetchAllCandidates: actions.fetchAll
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));