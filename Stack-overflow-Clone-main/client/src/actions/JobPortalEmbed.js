import React from "react";

const JobPortalEmbed = () => {
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <iframe
                src="http://localhost:5173" // Change this to your Job Portal URL
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Job Portal"
            />
        </div>

    );
};

export default JobPortalEmbed;
