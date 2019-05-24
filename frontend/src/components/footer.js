/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, {Component} from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <footer>
            <div className="footer" id="footer">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4  col-md-4 col-sm-4 col-xs-4">
                    <h3> Contact </h3>
                    <ul>
                      <li> <a href="#"> Contact </a> </li>
                      <li> <a href="#"> Mentions légales </a> </li>
                      {/* <li> <a href="#"> Charte de protection des données personnelles </a> </li> */}
                    </ul>
                  </div>
                  <div className="col-lg-4  col-md-4 col-sm-4 col-xs-4">
                    <h3> Plus d'infos </h3>
                    <ul>
                      <li> <a href="#"> Plan du site </a> </li>
                      <li> <a href="#"> FAQ </a> </li>
                      {/* <li> <a href="#"> Accessibilité </a> </li> */}
                    </ul>
                  </div>
                  
                  <div className="col-lg-4  col-md-4 col-sm-4 col-xs-4 ">
                    <h3> Suivez-nous</h3>
                    <ul className="social">
                      <li> <a href="#"> <ion-icon name="logo-facebook"></ion-icon> </a> </li>
                      <li> <a href="#"> <ion-icon name="logo-twitter"></ion-icon> </a> </li>
                      <li> <a href="#"> <ion-icon name="logo-youtube"></ion-icon> </a> </li>
                      <li> <a href="#"> <ion-icon name="logo-linkedin"></ion-icon> </a> </li>
                    </ul>
                  </div>
                </div>
                 
              </div>
         
            </div>
           
            {/* <div className="footer-bottom">
              <div className="container">
                <p className="pull-left"> Sport -eVent 2019 </p>
              </div>
            </div> */}
    
          </footer>
        )

    }

}

