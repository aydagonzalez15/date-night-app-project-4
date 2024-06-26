import * as React from "react";
import { Link } from "react-router-dom"
import { useState } from "react";
import * as eventsAPI from '../../utilities/events-api';
import { styled } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography } from "@mui/material";
import { Favorite as FavoriteIcon, ExpandMore as ExpandMoreIcon, MoreVert as MoreVertIcon, Link as LinkIcon, Accessible as AccessibleIcon } from "@mui/icons-material";
// import './ConcertEventCard.css';

export default function ConcertEventCard({ event, idx, getEvents, user }) {
    const [error, setError] = useState('');
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const imgRatio3_2 = event.images.find(img => img.ratio === '3_2')
    const imgUrl = imgRatio3_2.url

    async function handleEventSave(evt) {
        evt.preventDefault();
        // console.log("SEE ME?")
        const concertData = {
            name: event.name,
            imageUrl: ((imgUrl) ? imgUrl : (event.images[0].url)),
            websiteUrl: (event.url) ? event.url : "",
            venue: event._embedded.venues[0].name,
            venueLocation: `${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.name}`,
            eventDate: `${event.dates.start.localDate} ${event.dates.start.localTime}`,
            timezone: event.dates.timezone,
            accessibility: (event.accessibility) ? event.accessibility.ticketLimit : ""
        }
        // console.log(concertData)
        try {
            const concert = await eventsAPI.createConcertEvent(concertData)
            // console.log("concert:", concert)
            getEvents()
        } catch (error) {
            console.log("error:", error)
            setError('Save Concert Failed - Try Again');
        }
    }
    return (
        <div className="EventCard">
            {/* <div> */}
            <Card sx={{ maxWidth: 500 }}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            {/* <MoreVertIcon /> */}
                            <div> <AccessibleIcon /> {(event.accessibility) ? (event.accessibility.ticketLimit) : "N/A"}</div>
                        </IconButton>}

                    title={event.name}
                />
                <CardMedia
                    component="img"
                    height=""
                    image={(imgUrl) ? imgUrl : (event.images[0].url)}
                    alt={event.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {(event._embedded.venues) ? `${(event._embedded.venues[0].city.name)}, ${(event._embedded.venues[0].state.name)}` : " N/A"}

                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {user ?
                        <>
                            <IconButton onClick={handleEventSave} aria-label="add to favorites">
                                <FavoriteIcon className="favorite-icon" />
                            </IconButton>
                        </>
                        :
                        <>
                            <Tooltip title="Login to Save" placement="top">
                                <IconButton component={Link} to="/login" aria-label="add to favorites">
                                    <FavoriteIcon className="favorite-icon" />
                                </IconButton>
                            </Tooltip>
                        </>
                    }


                    <IconButton aria-label="share">
                        <a href={event.url} >< LinkIcon className="menu-icon" /></a>
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            <span>

                                {(event._embedded.venues) ? event._embedded.venues[0].name : "N/A"}
                                <div>Date: {new Date(event.dates.start.localDate).toLocaleDateString()}</div>
                                <div>Time: {event.dates.start.localTime}</div>
                                {/* <div>Sale Starts: {event.sales.public.startDateTime}</div> */}
                                {/* <div>{new Date(event.sales.public.startDateTime).toLocaleTimeString()}</div> */}
                                <div> <AccessibleIcon /> Accesibility: {(event.accessibility) ? event.accessibility.ticketLimit : "N/A"}</div>
                            </span>

                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>

            {/* </div> */}
        </div>
    )

}