Server Side Rendering(SSR) in angular using  ng Universal
---------------------------------------------------------

1. Terminal> type the command> ng add @nguniversal/express-engine --clientProject <your project name>

< -- OPTIONAL STEP: if you don't see "ModuleMapLoaderModule" import by default in your app.server.module.ts the follow this step
  Below module is required for Lazily loaded Module -->
2. Terminal> install npm package for ModuleMapLoaderModule > npm install --save @nguniversal/module-map-ngfactory-loader
3. Go to app.server.module.ts 
	> import { ModuleMapLoaderModule }  from '@nguniversal/module-map-ngfactory-loader';
	> @NgModule({
		imports: [ModuleMapLoaderModule] })

< -- Put condition in all the code in the app that is using BROWSER ONLY API like code that is accessing LOCALSTORAGE or DOCUMENT or any Browser based API that is not available at the Server since SSR(Server side Rending) is executed only at the server only and server doesn't have these api's available.

4 write following code to manage client side api access on server.

	import { Inject, PLATFORM_ID } from '@angular/core';

	import { isPlatformBrowser } from '@angular/common';


	constructor( @Inject(PLATFORM_ID) private platformId) {}


	sampleFunction() {	

	if (isPlatformBrowser(this.platformId)) {
	      // run browser specific web api code here.

		// eg. : localStorage.set();
		// eg. : document.querySelector();
	    }

	}
	

< -- run SSR commands -->

5. go to package.json and look for SSR commands

	> build:ssr
	> serve:ssr



