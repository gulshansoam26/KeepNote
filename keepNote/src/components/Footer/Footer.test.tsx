import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Footer} from './Footer';

describe('Footer',()=>{
    test('verify footer text is available',()=>{
        render(
            <Footer></Footer>
        )
        const footer = screen.getByRole('contentinfo');
        expect(within(footer).getByText(/2026\s*keepnote,\s*all rights reserved/i)).toBeInTheDocument();
    })

    test('verify footer social links exist with correct targets and hrefs',()=>{
        render(
            <Footer></Footer>
        )

        const footer = screen.getByRole('contentinfo');
        const links = within(footer).getAllByRole('link');
        expect(links).toHaveLength(3);

        const hrefs = links.map(a => a.getAttribute('href'));
         expect(hrefs).toEqual(
           expect.arrayContaining([
            'https://facebook.com',
            'https://linkedin.com',
            'https://instagram.com',
      ])
    );


       links.forEach(a=>{
        expect(a).toHaveAttribute('target','_blank')
       })

    })
})