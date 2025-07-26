import styled from 'styled-components'

const StyledH2Container = ({ className, children }) => {
    return <h2 className={className}>{children}</h2>
}

export const H2 = styled(StyledH2Container)`
    font-size: 25px;
    margin-top: 55px;
`
