import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';


const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello world</h1>
                <h2>Hello world</h2>
                <h3>Hello world</h3>
                <hr/>
                <Button> Button </Button>
                <Button disabled> Disabled Button </Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large} className={"custom"}> Large
                    Primary </Button>
                <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Danger </Button>
                <Button btnType={ButtonType.Link} href="https://www.google.com"> Google Link </Button>
                <Button btnType={ButtonType.Link} href="https://www.google.com" disabled> Google Link </Button>
                <hr/>
                <Menu>
                    <MenuItem>
                        Default
                    </MenuItem>
                    <MenuItem disabled>
                        Disabled
                    </MenuItem>
                    <MenuItem>
                        Item
                    </MenuItem>
                    <SubMenu title={"SubMenu"}>
                        <MenuItem>
                            Dropdown 1
                        </MenuItem>
                        <MenuItem>
                            Dropdown 2
                        </MenuItem>
                    </SubMenu>
                </Menu>
                <Menu defaultIndex={1} mode={"vertical"}>
                    <MenuItem>
                        Item 1
                    </MenuItem>
                    <MenuItem>
                        Item 2
                    </MenuItem>
                    <MenuItem disabled>
                        Item 3
                    </MenuItem>
                    <SubMenu title={"SubMenu"}>
                        <MenuItem>
                            Dropdown 1
                        </MenuItem>
                        <MenuItem>
                            Dropdown 2
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </header>
        </div>
    );
}

export default App;
