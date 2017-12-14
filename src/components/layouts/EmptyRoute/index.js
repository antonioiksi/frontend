import React from 'react'
import {Route} from 'react-router-dom'
import BackgroundSlideshow from 'react-background-slideshow'
import image1 from '../../../assets/bg01.jpg'
import image2 from '../../../assets/bg02.jpg'
//import image3 from './assets/003.jpg'

export const EmptyRoute =  ({component:Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (

            <div className="EmptyLayout">
                <BackgroundSlideshow images={[ image1, image2 ]} />
                <Component {...matchProps}/>
            </div>

        )}/>
    )
};
