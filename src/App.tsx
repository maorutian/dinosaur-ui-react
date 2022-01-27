import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';

//fontawesome: Pre-registering icon definitions
library.add(fas);

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Icon icon="arrow-down" theme="primary" size="10x"/>
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
                <Menu onSelect={index => alert(index)}>
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
                <Menu
                    defaultIndex={"1"}
                    mode={"vertical"}
                    onSelect={index => alert(index)}
                    defaultOpenSubMenus={['3']}>
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
