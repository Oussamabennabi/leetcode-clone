export type Problem = {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	order: number;
	solutionLink: ()=>string;
};

export const problems: Problem[] = [
	{
		id: 'two-sum',
		title: 'Two Sum',
		difficulty: 'Easy',
		category: 'Array',
		order: 1,
		solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
	{
		id: 'reverse-linked-list',
		title: 'Reverse Linked List',
		difficulty: 'Hard',
		category: 'Linked List',
		order: 2,
		solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
	{
		id: 'jump-game',
		title: 'Jump Game',
		difficulty: 'Medium',
		category: 'Dynamic Programming',
		order: 3,
		solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},

	{
		id: 'valid-parentheses',
		title: 'Valid Parentheses',
		difficulty: 'Easy',
		category: 'Stack',
		order: 4,solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
	{
		id: 'search-a-2d-matrix',
		title: 'Search a 2D Matrix',
		difficulty: 'Medium',
		category: 'Binary Search',
		order: 5,solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
	{
		id: 'container-with-most-water',
		title: 'Container With Most Water',
		difficulty: 'Medium',
		category: 'Two Pointers',
		order: 6,
		solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
	{
		id: 'merge-intervals',
		title: 'Merge Intervals',
		difficulty: 'Medium',
		category: 'intervals',
		order: 7,
		solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
	{
		id: 'maximum-depth-of-binary-tree',
		title: 'Maximum Depth of Binary Tree',
		difficulty: 'Easy',
		category: 'Tree',
		order: 8,solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
	{
		id: 'best-time-to-buy-and-sell-stock',
		title: 'Best Time to Buy and Sell Stock',
		difficulty: 'Easy',
		category: 'Array',
		order: 9,
		solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
	{
		id: 'subsets',
		title: 'Subsets',
		difficulty: 'Medium',
		category: 'Backtracking',
		order: 10,
		solutionLink: function () {
			return `https://leetcode.com/problems/${this.id}/solutions/`;
		},
	},
];
