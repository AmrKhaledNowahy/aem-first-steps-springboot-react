import { Page, withModel} from '@adobe/aem-react-editable-components';
import React from 'react';
import Header from './components/Header/Header';
import CrudComponent from "./components/CrudComponent/CrudComponent";
import {Link} from "react-router-dom";
import { Button, Container } from 'reactstrap';
import UsersList from "./components/CrudComponent/UsersList";

// This component is the application entry point
class App extends Page {
  render() {
    return (
      <div style={{
        // backgroundImage: `url("https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2022/02/abstract-texture-background_91008-369-e1656067886752.jpg?w=740&ssl=1")`,
        // backgroundImage: 'url("/brainscream-minimalist-wallpaper-blue.png")',
        // backgroundRepeat: "no-repeat",
        // alignSelf:"stretch",
        //   height: "100%",
          // content: '',
          // position: "absolute",
          left: 0, right: 0, top: 0, bottom: 0,
          zIndex: -20,
          opacity: 0.9,
        backgroundBlendMode: "soft-light"
      }}>
        <Header/>
        {/*<CrudComponent/>*/}
        {/*<UsersList/>*/}
        {this.childComponents}
        {this.childPages}
      </div>
    );
  }
}

export default withModel(App);
