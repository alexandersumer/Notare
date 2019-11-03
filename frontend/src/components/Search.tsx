import * as React from 'react';

interface Props {

}

interface State {
    searchBarText: string,
    myNotes: string[],
}

function fuzzy_match(str: string, pattern: string) : boolean {
    pattern = pattern.split("").reduce(function(a,b){ return a+".*"+b; });
    return (new RegExp(pattern)).test(str);
};  

export default class Search extends React.Component<Props, State> {
    constructor(props: Props, state: State){
        super(props, state);
        this.state = {
            searchBarText: '',
            myNotes: ['Guy likes butts', 'Daniel likes coconuts', 'Alex loves rust'],
        }
    }

    onChange(event: any){ // TODO: Add type
        this.setState({
            searchBarText: event.target.value,
        });
    }

    // Text box input
    // On submit, go fetch matchesw`1   qsrcfgb n         
    // Pull all notes from API
    // Filter matches based on textbox content

    getResults(){
        const { searchBarText, myNotes } = this.state;
        // filter for notes that have searchbartext in them
        if (searchBarText === '') return myNotes
        return myNotes.filter(n => fuzzy_match(n.toLowerCase(), searchBarText.toLowerCase()));

    }

    render(){
        return (
            <div>
                <input type="text" placeholder = "Search" onChange={this.onChange.bind(this)}/>
                <div>{this.getResults().map(res => (<div>{res}</div>))}</div>
            </div>

        )
    }




}