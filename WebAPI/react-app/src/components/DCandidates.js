import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { 
    Grid, 
    Paper, 
    Table, 
    TableCell, 
    TableContainer, 
    TableRow, 
    TableHead, 
    TableBody, 
    withStyles, 
    ButtonGroup,
    Button
} from '@material-ui/core';
import { useToasts } from "react-toast-notifications"; // Ensure this is imported

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
});

const DCandidates = ({classes, ...props}) => {
    const { addToast } = useToasts(); 
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllCandidates();
    }, []);

    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?')) {
            props.deleteDCandidate(id)
                .then(() => {
                    addToast("Deleted Successfully", { appearance: 'success' });
                })
                .catch((error) => {
                    addToast("Error: " + error.message, { appearance: 'error' });
                });
        }
    };
    

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm 
                        {...{currentId, setCurrentId}}
                        fetchAllCandidates={props.fetchAllCandidates}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.dCandidateList.map((record) => (
                                    <TableRow key={record.id} hover>
                                        <TableCell>{record.fullName}</TableCell>
                                        <TableCell>{record.mobile}</TableCell>
                                        <TableCell>{record.bloodGroup}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button onClick={() => setCurrentId(record.id)}>
                                                    <EditIcon color="primary"/>
                                                </Button>
                                                <Button onClick={() => onDelete(record.id)}>
                                                    <DeleteIcon color="secondary"/>
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list 
});

const mapActionToProps = {
    fetchAllCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));
