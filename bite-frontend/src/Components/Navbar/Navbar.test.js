import React from "react";
import Navbar from './Navbar';
import { render, getByText } from "@testing-library/react";

describe("Buttons Test (Navbar)", () => {
    it("Home Logo Button Click", () => {
        const { getByText } = render(<Navbar/>);
        expect(getByText('Bite').closest('a')).toHaveAttribute('href', '/')
    });


    it("Dashboard Button Click", () => {
        const { getAllByText } = render(<Navbar/>);
        const { dashButton } = getAllByText('Dashboard');
        expect(getAllByText('Dashboard').at(0)).toHaveAttribute('href', '/dashboard');
        expect(getAllByText('Dashboard').at(1)).toHaveAttribute('href', '/dashboard');
    });
});