import styled from "styled-components"
import { color, space, compose, flexbox, border, layout, typography } from "styled-system"

const Box = styled("div")(compose(color, space, flexbox, border, layout, typography))

export default Box
