
import ServerError500Page from '../../modules/ServerError/ServerError500Page';


const ServerError500 = () => {

    const  component = ServerError500Page()

    return component
}

document.querySelector('#root').innerHTML = ServerError500();

