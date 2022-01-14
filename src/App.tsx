import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button';


const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello world</h1>
                <h2>Hello world</h2>
                <h3>Hello world</h3>
                <hr/>
                <code>
                    let a = 1;
                </code>
                <hr/>
                <Button> Button </Button>
                <Button disabled> Disabled Button </Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Primary </Button>
                <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Danger </Button>
                <Button btnType={ButtonType.Link} href="https://www.google.com"> Google Link </Button>
                <Button btnType={ButtonType.Link} href="https://www.google.com" disabled> Google Link </Button>
            </header>
        </div>
    );
}

export default App;
