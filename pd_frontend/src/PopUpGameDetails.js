import styles from './PopUp.module.css';
import Game from './DisplayGame'
import React from 'react';

const Component = React.Component;

class PopUpGameDetails extends Component {
    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div className={styles.modal}>
                <div className={styles.modal_content2}>
                    <div><span className={styles.close} onClick={this.handleClick}>&times;</span></div>
                        <Game game={this.props.game}/>
                </div>
            </div>
        );
    }
}

export default PopUpGameDetails