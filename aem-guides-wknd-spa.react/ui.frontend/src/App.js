import { Page, withModel} from '@adobe/aem-react-editable-components';
import React from 'react';
import Header from './components/Header/Header';
import StyledGenericTable from "./components/GenericTable/StyledGenericTable";

// This component is the application entry point
class App extends Page {
     // mapping = 'empty-mapping';
    mapping = "User UUID, Username, Email, test skipped, skipped";

    render() {
    return (
      <div style={{
          left: 0, right: 0, top: 0, bottom: 0,
          zIndex: -20,
          opacity: 0.9,
          backgroundBlendMode: "soft-light"
      }}>
        <Header/>
          <h3>Test Column Name Mapping</h3>
          <StyledGenericTable apiUrl={"http://localhost:8088/users"} mapping={this.mapping}/>
          {this.childComponents}
          {this.childPages}
      </div>
    );
  }
}

export default withModel(App);
