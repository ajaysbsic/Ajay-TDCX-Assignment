import styled from "styled-components"
import {
  compose,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent
} from "styled-system"
import Box from "./Box"

const Flex = styled(Box)(compose(flexWrap, flexDirection, alignItems, justifyContent))

export default Flex