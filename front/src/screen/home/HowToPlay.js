import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import './HowToPlay.scss';

class HowToPlay extends React.Component {

    imageFormatter(cell, row){
        return <img src={cell} />;
    }

    render() {

        const mobsData = [{
            name: 'Wizard',
            imagesprite: "/images/wiz.png",
            imageprojectile: "/images/frost.png",
            description: "Ralenti quelques secondes",
            DamageValue: '5',
            Health: '100',
        }, {
            name: 'Witch',
            imagesprite: "/images/witch.png",
            imageprojectile: "/images/poison.png",
            description: "Paralyse quelques secondes",
            DamageValue: '1',
            Health: '100',
        }, {
            name: 'Warlock',
            imagesprite: "/images/warlo.png",
            imageprojectile: "/images/silence.png",
            description: "Empeche de tirer quelques secondes",
            DamageValue: '1',
            Health: '100',
        }, {
            name: 'Skeleton',
            imagesprite: "/images/skel.png",
            imageprojectile: "/images/fire.png",
            description: "Degats en continue quelques secondes",
            DamageValue: '1',
            Health: '100',
        },]
        
        const bosstab = [
            {
                name: 'Sahrotaar',
                imagesprite: "/images/boss.png",
                imageprojectile: "/images/fire.png",
                description: "Phases differentes ",
                DamageValue: '20',
                Health: '1000',
            },
        ];

        const lootstab = [
            {
                name: 'Heart',
                imagesprite: "/images/coeur.png",
                description: "Donne de la vie",
                Value: '20',
            },
            {
                name: 'Shield',
                imagesprite: "/images/boubou.png",
                description: "Donne du bouclier",
                Value: '15',
            },
            {
                name: 'Coin',
                imagesprite: "/images/coin.png",
                description: "Monnaie du jeu pour la boutique",
                Value: '10',
            },
            {
                name: 'BoostSpeed',
                imagesprite: "/images/speed.png",
                description: "Augmente la vitesse",
                Value: '1%',
            },
            {
                name: 'BoostDamage',
                imagesprite: "/images/damage.png",
                description: "Augmente les degats",
                Value: '1%',
            },

        ];

        const itemstab = [
            {
                name: 'Chest',
                imagesprite: "/images/cocofr.png",
                description: "Donne differents loots",          
           },

           {
            name: 'Torch',
            imagesprite: "/images/torch.png",
            description: "Donne de la vie si vous etes à proximite",          
           },

           {
            name: 'Key',
            imagesprite: "/images/key.png",
            description: "Permet d'ouvrir une porte speciale ",          
           },
        ];
            
        return (
            <div>                
                <BootstrapTable data={mobsData} striped={true} hover={true} className="tableMobs">
                    <TableHeaderColumn dataField="name" dataSort={true} isKey>Monstres</TableHeaderColumn>
                    <TableHeaderColumn dataField="imagesprite" dataFormat={this.imageFormatter}>Images</TableHeaderColumn>
                    <TableHeaderColumn dataField="imageprojectile" dataFormat={this.imageFormatter}>Projectiles</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="DamageValue" dataSort={true}>Degat</TableHeaderColumn>
                    <TableHeaderColumn dataField="Health" dataSort={true}>Sante</TableHeaderColumn>
                </BootstrapTable>
 
                <BootstrapTable data={bosstab} striped={true} hover={true} className="tableMobs tableBoss">
                    <TableHeaderColumn dataField="name" dataSort={true} isKey>Boss</TableHeaderColumn>
                    <TableHeaderColumn dataField="imagesprite" dataFormat={this.imageFormatter}>Images</TableHeaderColumn>
                    <TableHeaderColumn dataField="imageprojectile" dataFormat={this.imageFormatter}>Projectiles</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="DamageValue" dataSort={true}>Degat</TableHeaderColumn>
                    <TableHeaderColumn dataField="Health" dataSort={true}>Sante</TableHeaderColumn>
                </BootstrapTable>

                <BootstrapTable data={lootstab} striped={true} hover={true} className="tableMobs tableLoots">
                    <TableHeaderColumn dataField="name" dataSort={true} isKey>Loots</TableHeaderColumn>
                    <TableHeaderColumn dataField="imagesprite" dataFormat={this.imageFormatter}>Images</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="Value" dataSort={true}>Valeur</TableHeaderColumn>
                </BootstrapTable>

                <BootstrapTable data={itemstab} striped={true} hover={true} className="tableMobs tableItems">
                    <TableHeaderColumn dataField="name" dataSort={true} isKey>Objets speciaux</TableHeaderColumn>
                    <TableHeaderColumn dataField="imagesprite" dataFormat={this.imageFormatter}>Images</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default HowToPlay;
