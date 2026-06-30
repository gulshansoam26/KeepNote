import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from './Header';

describe('Header',()=>{
    test('verify brand title is visible',()=>{
        render(<Header/>);
        expect(screen.getByRole('heading',{name: /keepnote/i})).toBeInTheDocument()
    });

    test('children render in header',()=>{
        render(
            <Header>
                <label htmlFor="search">Search</label>
                <input id="search" type="text" />
            </Header>
            );
            expect(screen.getByRole('textbox',{name:/search/i})).toBeInTheDocument();
    });
});