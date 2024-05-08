import BaseConfiguration from '../../structures/baseConfiguration';

export default class EnvironmentConfiguration extends BaseConfiguration {
    public static isDevelopment: boolean = process.env.NODE_ENV === 'development';
}
