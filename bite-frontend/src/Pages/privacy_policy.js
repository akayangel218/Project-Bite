import './privacy_policy.css'
import React, { Component } from 'react';

class PrivacyPolicy extends Component { 
    render() {
        return (
            <div>
                <div className='title'> Privacy Policy </div>
                <div className='textbox'> 
                    <span className='text'>
                        We have no need for your data, which is why we won't ever collect any of it. The only data we ever save is the list of your liked and disliked restaurants, and this information is stored entirely on your browser. It never gets saved by us, and is only ever used to curate your results. If you ever decide to delete it, you can be sure it's truly gone.
                    </span>
                    <br></br>
                    <br></br>
                    <span className='text'>
                        We know you value your privacy, so if we ever monetize this app, we will never use any tracking metrics or 3rd party cookies. And we most certainly will never sell your data.
                    </span>
                    <br></br>
                    <br></br>
                    <span className='text'>
                        If you ever wish to remove your data from this app, the simplest way is to visit your <a href="/dashboard">dashboard</a> and un-like all your liked restaurants, then un-dislike all your disliked restaurants. Refresh the page and you've got a clean slate. Alternatively, you can also clear your browser's cache for this website. In any case, we never keep your data.
                    </span>
                </div>
            </div>
        );
    }
}

export default PrivacyPolicy;