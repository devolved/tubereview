# Tube Review - Youtube channel review site

**Node / Express / MongoDB / Handlebars**

Making this up as I go along, so no roadmap but have a few features that spring to mind

- Add: Fetch YouTube data on either URL or channel name add (not sure which is more noob proof) &#9745;
- Add: Preview in aside on fetch data &#9745;
- Review: Theme reviews with channel art &#9745;
- Review: Add channel info such as sub count &#9745;
- Channels: List of channels reviewed with review count
- Channels: Reviewed by list
- Channels: Preview of top (or only) review
- User: Top reviewers > review the reviewers (oooh meta!)
- User: login > top reviews etc etc

## Version 2

Reworking DB storage to reduce number of docs in collection. (limited RAM on dev machine)

- Channels: List of channels reviewed with review count &#9745;
- Actually have a numerical rating (average of reviews)
- Space for reviewed by (all same user for now) &#9745;



# Bugs

- Some undefined values in the YouTube API response cause errors &#9745;
- First review added doesn't return the review after being forwarded, initially
- Title length in preview class not refreshed when changing URL entered
- Can cause error if YT API has slow reply &#9745; 