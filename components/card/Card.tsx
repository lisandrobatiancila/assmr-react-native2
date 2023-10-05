import React from 'react';
import { CardContainerStyle } from "../modal/styles"

type CardContainerProps = {
    children: React.ReactNode,
    padding?: string,
    borderRadius?: string,
    backgroundColor?: string
};

export const CardContainer = ({ children, padding, borderRadius, backgroundColor }: CardContainerProps) => {
    return <CardContainerStyle padding = { padding } borderRadius = { borderRadius } backgroundColor = { backgroundColor} >
        { children }
    </CardContainerStyle>
}