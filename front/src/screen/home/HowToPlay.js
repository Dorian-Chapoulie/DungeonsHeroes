import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
    Card,
    CardBody,
    CardHeader,
} from 'reactstrap';
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
            description: "Donne de la vie si vous etes a proximite",          
           },

           {
            name: 'Key',
            imagesprite: "/images/key.png",
            description: "Permet d'ouvrir une porte speciale ",          
           },
        ];
            
        return (
            <div className="howtoplay"> 

                <Card style={{width: '60em'}}>
                    <CardHeader>
                        <h5 className="d-flex justify-content-center" style={{fontSize: '5em'}}>But du jeu</h5>
                    </CardHeader>
                    <CardBody>
                        <p className="but">
                            Vous et votre coequipier devez tuer tous les monstres qui croisent votre chemin, pour acceder a la salle superieure.
                            Essayez d'eviter les projectiles des monstres et ramassez certains loots pourra vous aider a avancer dans le jeu.
                            Plus vous avancez dans le jeu et plus il y a de monstres. 
                            Atteint un certain niveau, vous devrez affronter le boss pour terminer le jeu.
                        </p>
                    </CardBody>
                </Card>

                <Card style={{width: '60em'}}>
                    <CardHeader>
                        <h5 className="d-flex justify-content-center" style={{fontSize: '5em'}}>Monstres</h5>
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable data={mobsData} striped={true} hover={true} bordered={false} className="tableMobs">
                            <TableHeaderColumn dataField="name" dataSort={true} isKey>Nom</TableHeaderColumn>
                            <TableHeaderColumn dataField="imagesprite" dataFormat={this.imageFormatter}>Image</TableHeaderColumn>
                            <TableHeaderColumn dataField="imageprojectile" dataFormat={this.imageFormatter}>Projectile</TableHeaderColumn>
                            <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                            <TableHeaderColumn dataField="DamageValue" dataSort={true}>Degats</TableHeaderColumn>
                            <TableHeaderColumn dataField="Health" dataSort={true}>Sante</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
 
                <Card style={{width: '60em'}}>
                    <CardHeader>
                        <h5 className="d-flex justify-content-center" style={{fontSize: '5em'}}>Boss</h5>
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable data={bosstab} striped={true} hover={true} bordered={false} className="tableMobs tableBoss">
                            <TableHeaderColumn dataField="name" dataSort={true} isKey>Nom</TableHeaderColumn>
                            <TableHeaderColumn dataField="imagesprite" dataFormat={this.imageFormatter}>Image</TableHeaderColumn>
                            <TableHeaderColumn dataField="imageprojectile" dataFormat={this.imageFormatter}>Projectile</TableHeaderColumn>
                            <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                            <TableHeaderColumn dataField="DamageValue" dataSort={true}>Degats</TableHeaderColumn>
                            <TableHeaderColumn dataField="Health" dataSort={true}>Sante</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>

                <Card style={{width: '60em'}}>
                    <CardBody>
                        <CardHeader>
                            <h5 className="d-flex justify-content-center" style={{fontSize: '5em'}}>Loots</h5>
                        </CardHeader>
                        <BootstrapTable data={lootstab} striped={true} hover={true} bordered={false} className="tableMobs tableLoots">
                            <TableHeaderColumn dataField="name" dataSort={true} isKey>Nom</TableHeaderColumn>
                            <TableHeaderColumn dataField="imagesprite" dataFormat={this.imageFormatter}>Images</TableHeaderColumn>
                            <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                            <TableHeaderColumn dataField="Value" dataSort={true}>Valeur</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>

                <Card style={{width: '60em'}}>
                    <CardBody>
                        <CardHeader>
                            <h5 className="d-flex justify-content-center" style={{fontSize: '5em'}}>Objets speciaux</h5>
                        </CardHeader>
                        <BootstrapTable data={itemstab} striped={true} hover={true} bordered={false} className="tableMobs tableItems">
                            <TableHeaderColumn dataField="name" dataSort={true} isKey>Nom</TableHeaderColumn>
                            <TableHeaderColumn dataField="imagesprite" dataFormat={this.imageFormatter}>Images</TableHeaderColumn>
                            <TableHeaderColumn dataField="description" dataSort={true}>Description</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        );
    }
}


export default HowToPlay;
