import React, {useState} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Transition from './components/Transition/transition';
import Input from './components/Input/input';
import Icon from './components/Icon/icon';
import {AutoComplete} from './components/AutoComplete/autoComplete';

//fontawesome: Pre-registering icon definitions
library.add(fas);

const App: React.FC = () => {
    const [show, setShow] = useState(false);
    const fruit = ['apple', 'banana', 'carrot', 'mango', 'orange',
        'pear', 'watermelon', 'blueberry', 'strawberry', 'pineapple', 'honeydew', 'grape']
    const handleFetch = (query: string) => {
        return fruit.filter(name => name.includes(query))
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello world</h1>
                <h2>Hello world</h2>
                <h3>Hello world</h3>
                <hr/>
                <Button> Button </Button>
                <Button disabled> Disabled Button </Button>
                <Button btnType='primary' size='lg' className={"custom"}> Large
                    Primary </Button>
                <Button btnType='danger' size='sm'> Small Danger </Button>
                <Button btnType='link' href="https://www.google.com"> Google Link </Button>
                <Button btnType='link' href="https://www.google.com" disabled> Google Link </Button>
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
                <hr/>
                <Icon icon='coffee'/>
                <Icon icon='dove' theme='primary'/>
                <Icon icon="skull-crossbones" theme='warning'/>
                <Icon icon="exclamation" theme='danger'/>
                <hr/>
                <Button onClick={() => {
                    setShow(!show)
                }}> Animation </Button>

                <Transition
                    in={show}
                    timeout={300}
                    animation="zoom-in-left"
                >
                    <p>Animation: zoom-in-left</p>
                </Transition>
                <hr/>
                <Input
                    style={{width: '400px'}}
                    placeholder="disabled input"
                    disabled
                />

                <Input
                    style={{width: '400px'}}
                    placeholder="input with icon"
                    icon="search"
                />

                <Input
                    style={{width: '400px'}}
                    defaultValue="large size"
                    size="lg"
                />
                <Input
                    style={{width: '400px'}}
                    placeholder="small size"
                    size="sm"
                />
                <Input
                    style={{width: '400px'}}
                    defaultValue="pend"
                    prepend="https://"
                    append=".com"
                />
                <hr/>
                <AutoComplete
                    fetchSuggestions={handleFetch}
                    onSelect={()=>console.log('selected')}
                />
            </header>
        </div>
    );
}

export default App;
