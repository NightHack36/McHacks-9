import styled from "styled-components"
import {motion} from 'framer-motion';

export const FlexBox = styled(motion.div)`
	display: flex;
	flex-direction: ${props => props.direction || props.dir || "row"};
	justify-content: ${props => props.justify || "flex-start"};
	align-items: ${props => props.align || "center"};
	flex-wrap: ${props => props.wrap || "nowrap"};
    ${props => props.fluid ? {width: '100%', flex: 1} : {}}
`