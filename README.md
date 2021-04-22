# RS School Angular final task  (2021q1) 

# Project Structure

------------
![Screenshot from 2021-03-21 20-37-00](https://user-images.githubusercontent.com/59873638/112202375-5eab6680-8c22-11eb-8f39-12bd20fff80b.png)
##
# **Principles of team work**

1.Write your work status and check others everyday.

2.Stick close to **the code guide** (further below).

3.Do ask someone who can help you if you can&#39;t solve something.

4.Use visual instruments to represent your idea about what you want to do.

5.Don&#39;t be afraid of correcting someone if he&#39;s or she&#39;s not right.

6.Share with your ideas in the chat.

##
# **Code guide**

1.Strict typing:

1. any, unknown, null, undefined, {}, [] - **forbidden**.
2. but you can use type unknown if you prove its necessity.

2.Fixture naming:

1. File names of services,components, interfaces,models,modules, states should be like that - **book.component.ts** , where the first word is a name of the fixture and the second is a type of the fixture.
2. File names of constants include their name only, for example: _ **book.ts** __._
3. But current names of fixtures shouldn&#39;t have their postfix, for example: file _ **book.component.ts** _ and it&#39;s class **Book** (exception: services, which you should
 name like that: file _ **book.service.ts** _ and it&#39;s class **BookService** ).

3.Other rules:

1. One fixture - one file.For example, you can&#39;t hold two interfaces in a single file, so there should be only one export.
2. Before making pull requests, you should get rid of dead code, such as comments, console.logs, debugs etc.
3. Remove extra spaces, empty constructors and functions.

##
# **Work with Git**

1. Create a branch according to the name of the issue in GitHub Projects.

git checkout develop
git checkout -b branch\_name

1. A feature branch can be split, if the functionality is large or if several people are working on the feature.(try to avoid this).
2. Commits should be named according to the convention([Git convention](https://docs.rs.school/#/git-convention)).
3. **git pull develop** (do it more often so there will be fewer conflicts).
4. Resolve conflicts, if any. When conflicts are large and it is not clear how to resolve them without breaking the application, call your team lead or mentors (rule 1 from &quot;Collaboration&quot;).
5. Create Pull Request and add current project, issue and reviewers(the whole team) **at PR&#39;s metadata.(menu on the right side)**
6. Every willing may review the code, but you need 2 approvals by a mentor and someone else to merge the branch.

 git checkout develop 
 git checkout Your-branch
 git merge develop 


If you need to continue the work, but your recent PR is not approved, you should inherit from your current branch(not develop).In the end should make one more PR in your parent branch, but not develop.Delete merged branches.

 git checkout your-branch
 git checkout -b branch_name


##
# **Work with Git Projects**

1. Open [the board with tasks](https://github.com/whattablackhole/rslang/projects/1).

2.From the To do column (if not there, then from the Backlog) select a task based on priority:

- as long as there are reds, do not take orange, yellow, gray,

- while there are orange ones, do not take yellow and gray ones,

- while there are yellow ones, do not take the gray ones.

Click on the name of the task (highlighted in blue), the task card will open on the right, add yourself to Assignees in it.

Move the task to the In Progress column.

After merging of the feature, your issue automatically will move to the Done column.


![Screenshot from 2021-03-25 11-28-25](https://user-images.githubusercontent.com/59873638/112443045-89e6a080-8d5d-11eb-93a7-c1f5be1a2108.png)

