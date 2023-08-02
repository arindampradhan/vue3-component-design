import * as components from './components'
import { type App } from 'vue'

type ComponentType = typeof components[keyof typeof components]

export interface GDSInstance {
	componentPrefix: string
	install: (app: App) => void
}

interface GDSCreateOptions {
	components?: ComponentType[]
	componentPrefix?: string
}

function create({
	componentPrefix = 'Z',
	components = []
}: GDSCreateOptions = {}): GDSInstance {
	const installTargets: App[] = []
	function registerComponent(
		app: App,
		name: string,
		component: ComponentType
	): void {
		const registered = app.component(componentPrefix + name)
		if (!registered) {
			app.component(componentPrefix + name, component)
		}
	}
	function install(app: App): void {
		if (installTargets.includes(app)) return
		installTargets.push(app)
		components.forEach((component) => {
			const { name } = component
			registerComponent(app, name, component)
		})
	}
	return {
		componentPrefix,
		install
	}
}


const gds = create({
	components: Object.keys(components).map(
		(key) => components[key as keyof typeof components]
	)
})

export default gds
export const install = gds.install