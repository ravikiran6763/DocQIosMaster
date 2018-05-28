/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  DoctorQuick
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"
#import "DoctorQuick-Swift.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    [self registerForVoIPPushes];
    
    
    
    // only set if not already set in subclass
    if (self.viewController == nil) {
        self.viewController = [[MainViewController alloc] init];
    }
    
    // Set your app’s start page by setting the <content src=‘foo.html’ /> tag in config.xml.
    // If necessary, uncomment the line below to override it.
    
    self.viewController.startPage = @"index.html";
    
    
    
    self.window = [[VSeeWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
    
    //UIViewController *navRootViewController = [[MainViewController alloc]init];
    
    VSeeNavigationController *navController = [[VSeeNavigationController alloc] initWithRootViewController:  self.viewController];
    
    
    [navController setNavigationBarHidden:true];
    
    [[UIApplication sharedApplication] setStatusBarHidden:YES];
    
    [self.window makeKeyAndVisible];
    
    
    
    CallManager.sharedInstance.navigationController = navController;
    
    
    self.window.rootViewController = navController;
    
    
    
    return YES;
    
}


-(void)registerForVoIPPushes
{
    PKPushRegistry * voipRegistry = [[PKPushRegistry alloc]initWithQueue:nil];
    voipRegistry.delegate = self ;
    
    //Initiate   registration.
    voipRegistry.desiredPushTypes = [NSSet setWithObject:PKPushTypeVoIP];
}

-(void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials    *)credentials forType:(PKPushType)type
{
    
    NSLog ( @"THE TOKEN IS:");
    NSLog(@"%@", credentials.token);
    
    
    
    
    [VSeeServerConnection defaultConnection].deviceToken = credentials.token;
    
#ifdef   DEBUG
    [VSeeServerConnection defaultConnection].sandboxPushMode = YES ;
#endif
}


-(void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type
{
    
    NSLog ( @"THE PUSH:");
    [[VSeeNotificationCenter defaultCenter] handlePushDictionary:payload.dictionaryPayload];
    
    
}

-(void)pushRegistry:(PKPushRegistry *)registry didInvalidatePushTokenForType:(PKPushType) type
{
    
    NSLog ( @"Device   token   invalidated   for   push." );
    
}

-(void)application:(UIApplication *)application didReceiveLocalNotification:( UILocalNotification *)notification
{
    
    [[VSeeNotificationCenter defaultCenter] handleLocalNotification:notification];
    
}

@end
