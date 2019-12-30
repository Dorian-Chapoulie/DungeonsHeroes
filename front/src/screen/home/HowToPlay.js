import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class HowToPlay extends React.Component {    
    
     imageFormatter(cell, row){
        return <img src={cell} />;
    }

    render() {    

        const products = [
            {
                name: 'Wizzard',
                description: "Grand mage qui ralenti ces cibles",
                image: "/assets/wizzard-sprite.png",
            },
        ];

        return (               
            <BootstrapTable data={products} striped={true} hover={true}>
                <TableHeaderColumn dataField="name" dataSort={true} isKey>Nom</TableHeaderColumn>
                <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                <TableHeaderColumn dataField="image" dataFormat={this.imageFormatter}>Image</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}


export default HowToPlay;
