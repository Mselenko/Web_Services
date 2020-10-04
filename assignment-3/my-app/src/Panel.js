import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    formControl: { maxWidth: '100%' },
}));


function Panel(props) {

    const style = useStyles();
    let teamProjects = props.Team.Projects.map(prjID => props.Projects.find(id => id._id === prjID));

    const [TeamMembers, setTeamMembers] = React.useState(props.Team.Employees);
    const [TeamLead, setTeamLead] = React.useState(props.Team.TeamLead);
    const [Projects, setProjects] = React.useState(teamProjects);


    function FullName(id) 
    {
        if (Array.isArray(id))
            return id.map(_id => props.Employees.find(emp => emp._id === _id)).map(employee => employee.FirstName + ' ' + employee.LastName).join(', ');

        let exist = props.Employees.find(emp => emp._id === id);

        if (exist) return exist.FirstName + ' ' + exist.LastName;
    }


    function ProjectName(id) 
    {

        if (Array.isArray(id)) 
                 return (teamProjects.map(assignedPrj => assignedPrj.ProjectName).join(', '));
        
            let assignedProject = props.Projects.find(prj => prj._id === id);

            if (assignedProject)
                return assignedProject.ProjectName;
    }

    function teamLeadChange(event) 
    {
        setTeamLead(event.target.value)
    }

    function teamMemberChange(event) 
    {
        setTeamMembers(event.target.value)
    }

    function projectChange(event)
    {
        setProjects(event.target.value)
    }


    function saveChanges() 
    {

        fetch("https://desolate-sierra-97521.herokuapp.com/team/" + props.Team._id,
            {
                method: 'PUT',
                body: JSON.stringify({
                    Projects,
                    TeamLead,
                    Employees: TeamMembers

                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(data => {
                alert("Changes were successfully saved");
            }).catch(err => {
                alert(err)
            });
    }

    return (

        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{props.Team.TeamName}</h3>
                    <button className="btn btn-primary btn xs pull-right" onClick={saveChanges}>Save</button>
                </div>

                <div className="panel-body">

                    <h5>Team Lead</h5>
                    <Select
                        variant="outlined"
                        id="team-lead-select"
                        single="true"
                        autoWidth={true}
                        value={TeamLead}
                        onChange={teamLeadChange}
                        input={<Input />}
                        renderValue={selected => FullName(selected)}>
                        {
                            props.Employees.map(emp =>
                                <MenuItem key={emp._id} value={emp._id}>
                                    <ListItemText primary={FullName(emp._id)} />
                                </MenuItem>)
                        }
                    </Select>


                    <h5>Team Members</h5>
                    <FormControl className={style.formControl} variant="outlined" >
                        <Select
                            variant="outlined"
                            id="team-members-select"
                            multiple
                            autoWidth={true}
                            value={TeamMembers}
                            onChange={teamMemberChange}
                            input={<Input />}
                            renderValue={selected => FullName(selected)}>
                            {
                                props.Employees.map(emp =>
                                <MenuItem key={emp._id} value={emp._id}>
                                    <ListItemText primary={FullName(emp._id)} />
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>


                    <h5>Projects</h5>
                    <Select
                        variant="outlined"
                        id="projects-select"
                        multiple
                        autoWidth={true}
                        value={Projects}
                        onChange={projectChange}
                        input={<Input />}
                        renderValue={selected => ProjectName(selected)}>
                        {
                            Projects.map((prj,i) =>
                            <MenuItem key={prj._id} value={prj._id}>
                                <ListItemText key={prj._id} primary={ProjectName(prj._id)} />
                            </MenuItem>)
                        }
                    </Select>


                </div>
            </div>
        </div>
    );
}


export default Panel;
